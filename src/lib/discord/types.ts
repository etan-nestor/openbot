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

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  bot?: boolean;
}

export interface DiscordMessage {
  id: string;
  author: DiscordUser;
  content: string;
  timestamp: string;
  edited_timestamp: string | null;
  channel_id: string;
  attachments: DiscordAttachment[];
  embeds: DiscordEmbed[];
  mentions: DiscordUser[];
  pinned: boolean;
  type: number;
}

export interface DiscordAttachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  content_type?: string;
}

export interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: EmbedField[];
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordMember {
  user?: DiscordUser;
  roles: string[];
  joined_at: string;
  nick?: string | null;
  premium_since?: string | null;
}