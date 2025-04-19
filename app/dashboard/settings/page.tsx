import { Separator } from "@/components/ui/separator"
import { RedisStatus } from "@/components/dashboard/redis-status"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RedisStatus />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and timezone.
          </p>
        </div>
        <Separator />
        {/* Account settings form would go here */}
        <div className="p-4 border rounded-md bg-muted/50">
          <p className="text-sm text-muted-foreground">Account settings form placeholder</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <p className="text-sm text-muted-foreground">Configure how you receive email notifications.</p>
        </div>
        <Separator />
        {/* Email settings form would go here */}
        <div className="p-4 border rounded-md bg-muted/50">
          <p className="text-sm text-muted-foreground">Email notification settings placeholder</p>
        </div>
      </div>
    </div>
  )
}
