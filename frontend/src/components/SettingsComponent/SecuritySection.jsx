import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { authService } from "@/services/authService"
import { activateToast } from "../Toast/ActivateToast"
import { useAuth } from "@/contexts/AuthContext"

export default function SecuritySection({ securityRef }) {

    const [payload, setPayload] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value
        })
    }

    const passwordMatch = payload.newPassword === payload.confirmNewPassword
    const notEmpty = payload.oldPassword && payload.newPassword && payload.confirmNewPassword

    const handleSubmit = async (e) => {
        e.preventDefault()

        // 1. Validation
        if (!notEmpty) {
            activateToast('error', 'All fields are required')
            return
        }

        if (!passwordMatch) {
            activateToast('error', 'Passwords do not match')
            return
        }

        setLoading(true)
        try {
            // 2. Await the service call
            await authService.changePassword(payload.oldPassword, payload.newPassword)

            activateToast('success', 'Password changed successfully')

            // 3. BEST PRACTICE: Reset form on success
            setPayload({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            })
        } catch (error) {
            console.error(error)
            // 4. BEST PRACTICE: Show specific error from backend (e.g., "Incorrect old password")
            const message = error.response?.data?.message || 'Failed to change password'
            activateToast('error', message)
        } finally {
            setLoading(false)
        }
    }

    const [isDeleting, setIsDeleting] = useState(false)
    const { deleteAccount } = useAuth()

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteAccount()
            // NOTE: Since deleteAccount() wipes the user state in AuthContext, 
            // this component will automatically "disappear" as the app redirects to Landing.
            activateToast('success', 'Account deleted successfully')
        } catch (error) {
            console.error(error)
            activateToast('error', 'Failed to delete account')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <section ref={securityRef} id="security" className="space-y-6 scroll-mt-8" >
            <div>
                <h3 className="text-lg font-semibold text-foreground">Security</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage your password and account security.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="••••••••" onChange={handleChange} name="oldPassword" value={payload.oldPassword} />
                </div>
                <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" onChange={handleChange} name="newPassword" value={payload.newPassword} />
                </div>
                <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="••••••••" onChange={handleChange} name="confirmNewPassword" value={payload.confirmNewPassword} />
                </div>
                <Button className="w-full sm:w-auto" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                </Button>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t dark:border-slate-800">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="justify-start gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 p-0 h-auto font-medium">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="bg-rose-600 hover:bg-rose-700 text-white"
                            >
                                {isDeleting ? "Deleting..." : "Delete Account"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </section >
    )
}