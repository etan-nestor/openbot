import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

// Types étendus
export interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  bot?: boolean;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

export interface DiscordGuildDetails extends DiscordGuild {
  description: string | null;
  member_count: number;
  premium_subscription_count: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
}

export interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  position: number;
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: string | null;
}

export interface DiscordMessage {
  id: string;
  channel_id: string;
  author: DiscordUser;
  content: string;
  timestamp: string;
  edited_timestamp: string | null;
  attachments: any[];
  embeds: any[];
  mentions: any[];
}

export interface DiscordMember {
  user?: DiscordUser;
  nick?: string | null;
  roles: string[];
  joined_at: string;
  premium_since?: string | null;
}

export interface DiscordRole {
  id: string;
  name: string;
  color: number;
  position: number;
  permissions: string;
  mentionable: boolean;
}

export class DiscordAPI {
  private static async request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, body?: any): Promise<T> {
    try {
      const options: any = { method };
      if (body) options.body = body;
      
      const response = await rest.request({
        url: route,
        ...options
      });
      return response as T;
    } catch (error) {
      console.error(`Discord API Error [${method} ${route}]:`, error);
      throw error;
    }
  }

  // Guilds
  static async getGuilds(): Promise<DiscordGuild[]> {
    return this.request('GET', Routes.userGuilds());
  }

  static async getGuild(guildId: string): Promise<DiscordGuildDetails> {
    return this.request('GET', Routes.guild(guildId));
  }

  // Channels
  static async getChannels(guildId: string): Promise<DiscordChannel[]> {
    return this.request('GET', Routes.guildChannels(guildId));
  }

  static async createChannel(guildId: string, channelData: Partial<DiscordChannel>): Promise<DiscordChannel> {
    return this.request('POST', Routes.guildChannels(guildId), channelData);
  }

  // Messages
  static async getMessages(channelId: string, limit = 50): Promise<DiscordMessage[]> {
    return this.request('GET', `${Routes.channelMessages(channelId)}?limit=${limit}`);
  }

  static async sendMessage(channelId: string, content: string): Promise<DiscordMessage> {
    return this.request('POST', Routes.channelMessages(channelId), { content });
  }

  // Members
  static async getMembers(guildId: string): Promise<DiscordMember[]> {
    return this.request('GET', Routes.guildMembers(guildId));
  }

  // Roles
  static async getRoles(guildId: string): Promise<DiscordRole[]> {
    return this.request('GET', Routes.guildRoles(guildId));
  }
}