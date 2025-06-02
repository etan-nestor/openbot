import { NextResponse } from 'next/server';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

// Types étendus pour les données Discord
interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

interface DiscordGuildDetails {
  id: string;
  name: string;
  icon: string | null;
  member_count: number;
  premium_subscription_count: number;
}

interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  position: number;
}

interface DiscordMessage {
  id: string;
  author: {
    id: string;
    username: string;
    avatar: string | null;
    bot?: boolean;
  };
  content: string;
  timestamp: string;
  channel_id: string;
}

interface DiscordMember {
  user: {
    id: string;
    username: string;
    avatar: string | null;
  };
  roles: string[];
  joined_at: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
): Promise<NextResponse<any>> {
  try {
    const [endpoint, ...args] = params.path;

    switch (endpoint) {
      case 'guilds': {
        const guilds = await rest.get(Routes.userGuilds()) as DiscordGuild[];
        return NextResponse.json(guilds);
      }
        
      case 'guild': {
        const [guildId] = args;
        if (!guildId) throw new Error('Guild ID required');
        const guildData = await rest.get(Routes.guild(guildId)) as DiscordGuildDetails;
        return NextResponse.json(guildData);
      }
        
      case 'channels': {
        const [guildId] = args;
        if (!guildId) throw new Error('Guild ID required');
        const channels = await rest.get(Routes.guildChannels(guildId)) as DiscordChannel[];
        return NextResponse.json(channels.filter(c => c.type === 0 || c.type === 5));
      }

      case 'messages': {
        const [channelId] = args;
        if (!channelId) throw new Error('Channel ID required');
        const messages = await rest.get(Routes.channelMessages(channelId), {
          query: new URLSearchParams({ limit: '50' })
        }) as DiscordMessage[];
        return NextResponse.json(messages.reverse()); // Plus récents en premier
      }

      case 'members': {
        const [guildId] = args;
        if (!guildId) throw new Error('Guild ID required');
        const members = await rest.get(Routes.guildMembers(guildId)) as DiscordMember[];
        return NextResponse.json(members);
      }

      case 'user': {
        const [userId] = args;
        if (!userId) throw new Error('User ID required');
        const user = await rest.get(Routes.user(userId));
        return NextResponse.json(user);
      }

      default:
        return NextResponse.json(
          { error: 'Endpoint not found' },
          { status: 404 }
        );
    }
  } catch (error) {
    const err = error as Error;
    console.error('API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { path: string[] } }
): Promise<NextResponse<any>> {
  try {
    const [endpoint, ...args] = params.path;
    const body = await request.json();

    switch (endpoint) {
      case 'messages': {
        const [channelId] = args;
        if (!channelId) throw new Error('Channel ID required');
        if (!body.content) throw new Error('Message content required');
        
        const sentMessage = await rest.post(Routes.channelMessages(channelId), {
          body: { content: body.content }
        }) as DiscordMessage;
        
        return NextResponse.json(sentMessage);
      }

      case 'commands': {
        const [guildId] = args;
        if (!guildId) throw new Error('Guild ID required');
        if (!body.name || !body.description) throw new Error('Command name and description required');
        
        const command = await rest.post(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID!, guildId), {
          body
        });
        
        return NextResponse.json(command);
      }

      default:
        return NextResponse.json(
          { error: 'Endpoint not found' },
          { status: 404 }
        );
    }
  } catch (error) {
    const err = error as Error;
    console.error('API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { path: string[] } }
): Promise<NextResponse<any>> {
  try {
    const [endpoint, ...args] = params.path;

    switch (endpoint) {
      case 'messages': {
        const [channelId, messageId] = args;
        if (!channelId || !messageId) throw new Error('Channel ID and Message ID required');
        
        await rest.delete(Routes.channelMessage(channelId, messageId));
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json(
          { error: 'Endpoint not found' },
          { status: 404 }
        );
    }
  } catch (error) {
    const err = error as Error;
    console.error('API Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}