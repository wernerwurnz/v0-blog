import type { User } from "@supabase/supabase-js"
import type { UserProfile } from "@/types/database"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { Calendar, Mail, UserIcon } from "lucide-react"

interface ProfileHeaderProps {
  user: User
  profile: UserProfile
}

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Avatar className="h-24 w-24 border-2 border-evenizer-purple">
        <AvatarImage src={profile.avatar_url || "/placeholder.svg?height=96&width=96&query=person"} alt="Profile" />
        <AvatarFallback>{profile.full_name?.[0] || user.email?.[0]?.toUpperCase() || <UserIcon />}</AvatarFallback>
      </Avatar>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold">{profile.full_name || "User"}</h1>
        <p className="text-muted-foreground">{profile.role || "Event Enthusiast"}</p>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-evenizer-purple" />
            {user.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-evenizer-purple" />
            Member since {formatDate(user.created_at || profile.created_at)}
          </div>
        </div>

        {profile.bio && (
          <div className="mt-4 text-sm">
            <p>{profile.bio}</p>
          </div>
        )}
      </div>
    </div>
  )
}
