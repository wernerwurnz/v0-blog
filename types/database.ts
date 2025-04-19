export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export type Tag = {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  image_url: string | null
  published: boolean
  featured: boolean
  author_id: string
  category_id: string | null
  read_time: number | null
  views: number
  created_at: string
  updated_at: string
}

export type PostWithRelations = Post & {
  category?: Category
  author?: Profile
  tags?: Tag[]
}

export type Comment = {
  id: string
  content: string
  post_id: string
  user_id: string
  parent_id: string | null
  likes: number
  created_at: string
  updated_at: string
}

export type CommentWithUser = Comment & {
  user: Profile
  replies?: CommentWithUser[]
  isLiked?: boolean
}

export type UserLike = {
  user_id: string
  comment_id: string
  created_at: string
}

export type Favorite = {
  user_id: string
  post_id: string
  created_at: string
}

export type UserProfile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  role: string | null
  website: string | null
  twitter: string | null
  linkedin: string | null
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  role: string | null
  website: string | null
  twitter: string | null
  linkedin: string | null
  created_at: string
  updated_at: string
}

export type Event = {
  id: string
  title: string
  description: string | null
  date: string
  time: string | null
  location: string | null
  image_url: string | null
  user_id: string
  created_at: string
  updated_at: string
}

export type Resource = {
  id: string
  title: string
  description: string | null
  file_url: string
  icon: string | null
  post_id: string
  created_at: string
  updated_at: string
}

export type NewsletterSubscriber = {
  id: string
  email: string
  name: string | null
  subscribed: boolean
  created_at: string
  updated_at: string
}
