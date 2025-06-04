"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { User, Lock, Camera, Save, AlertCircle, X, ChevronLeft, Check } from "lucide-react"
import BasePage from "@/components/base-page"
import { useUser } from "@/lib/useUser"
import toast, { Toaster } from "react-hot-toast"

export default function Settings() {
    const { user, updateUser } = useUser()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        nickname: user?.nickname || "",
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        biography: user?.biography || "",
    })

    useEffect(() => {
        document.title = "Lootopia - Paramètres du compte"
    }, [])

    const [profileImage, setProfileImage] = useState<string | null>(user?.profilePicture || null)
    const [previewImage, setPreviewImage] = useState<string | null>("/placeholder.svg?height=128&width=128")
    const [isUploading, setIsUploading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setFormData({
            nickname: user?.nickname || "",
            email: user?.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            biography: user?.biography || "",
        })

        setProfileImage(user?.profilePicture || null);
        setPreviewImage(user?.profilePicture || "/placeholder.svg?height=128&width=128");
    }, [user])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.includes("image/")) {
            toast("Veuillez sélectionner une image (JPG, PNG, etc.)")
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast("La taille de l'image ne doit pas dépasser 5MB")
            return
        }

        setIsUploading(true)

        // Create preview
        const reader = new FileReader()
        reader.onload = (event) => {
            setPreviewImage(event.target?.result as string)
            setIsUploading(false)
        }
        reader.readAsDataURL(file)

        // In a real app, you would upload the file to your server/storage here
        // For this example, we'll just use the preview as the "uploaded" image
        setTimeout(() => {
            setProfileImage(previewImage)
            setIsUploading(false)
        }, 1000)
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const cancelImageUpload = () => {
        setPreviewImage(profileImage)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    // Password validation functions
    const getPasswordValidation = (password: string) => {
        const validations = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        }
        return validations
    }

    const isPasswordValid = (password: string) => {
        const validations = getPasswordValidation(password)
        return Object.values(validations).every(Boolean)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // Validate nickname
        if (!formData.nickname.trim()) {
            newErrors.nickname = "Le pseudo est requis"
        } else if (formData.nickname.length < 3) {
            newErrors.nickname = "Le pseudo doit contenir au moins 3 caractères"
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format d'email invalide"
        }

        // Validate password if user is trying to change it
        if (formData.newPassword) {
            if (!formData.currentPassword) {
                newErrors.currentPassword = "Mot de passe actuel requis"
            }

            if (!isPasswordValid(formData.newPassword)) {
                newErrors.newPassword = "Le mot de passe ne respecte pas tous les critères"
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
            }
        }

        // Validate biography length
        if (formData.biography.length > 200) {
            newErrors.biography = "La biographie ne peut pas dépasser 200 caractères"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Update user data
            updateUser({
                ...user,
                nickname: formData.nickname,
                email: formData.email,
                biography: formData.biography,
                profilePicture: previewImage || user?.profilePicture || "",
            })

            toast.success("Vos informations ont été mises à jour avec succès")

            // Reset password fields
            setFormData((prev) => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }))
        } catch {
            toast.error("Une erreur est survenue lors de la mise à jour de vos informations")
        } finally {
            setIsSubmitting(false)
        }
    }

    const passwordValidations = getPasswordValidation(formData.newPassword)

    return (
        <BasePage>
            <div className="min-h-screen bg-gradient-to-br from-sand-50 to-gray-50 pb-12">
                {/* Header */}
                <div className="bg-blue-500 text-white p-6">
                    <div className="container mx-auto">
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-blue-400 mb-4"
                            onClick={() => router.push("/profile")}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Retour au profil
                        </Button>
                        <h1 className="text-3xl font-bold">Paramètres du compte</h1>
                        <p className="text-blue-100 mt-2">Gérez vos informations personnelles et préférences</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <Tabs defaultValue="profile" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-2 bg-white border border-gray-200">
                            <TabsTrigger
                                value="profile"
                                className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                            >
                                <User className="w-4 h-4" />
                                Profil
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
                            >
                                <Lock className="w-4 h-4" />
                                Sécurité
                            </TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleSubmit}>
                            <TabsContent value="profile" className="space-y-6">
                                <Card className="border-gray-200 bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-gray-600">Photo de profil</CardTitle>
                                        <CardDescription>Choisissez une image qui vous représente</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <div className="relative">
                                                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                                                    {previewImage ? (
                                                        <Image
                                                            src={previewImage || "/placeholder.svg"}
                                                            alt="Photo de profil"
                                                            width={128}
                                                            height={128}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                                                            {formData.nickname?.charAt(0).toUpperCase() || "?"}
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        onClick={triggerFileInput}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white"
                                                        disabled={isUploading}
                                                    >
                                                        <Camera className="w-4 h-4 mr-2" />
                                                        {isUploading ? "Chargement..." : "Changer la photo"}
                                                    </Button>
                                                    {previewImage !== profileImage && (
                                                        <Button type="button" variant="outline" onClick={cancelImageUpload}>
                                                            <X className="w-4 h-4 mr-2" />
                                                            Annuler
                                                        </Button>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-400">Formats acceptés: JPG, PNG. Taille max: 5MB</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-gray-200 bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-gray-600">Informations personnelles</CardTitle>
                                        <CardDescription>Modifiez vos informations personnelles</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nickname" className="text-gray-600">
                                                Pseudo
                                            </Label>
                                            <Input
                                                id="nickname"
                                                name="nickname"
                                                value={formData.nickname}
                                                onChange={handleInputChange}
                                                placeholder="Votre pseudo"
                                                className={errors.nickname ? "border-red-500" : ""}
                                            />
                                            {errors.nickname && (
                                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.nickname}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-600">
                                                Adresse email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="votre.email@exemple.com"
                                                className={errors.email ? "border-red-500" : ""}
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="biography" className="text-gray-600">
                                                Biographie
                                            </Label>
                                            <Textarea
                                                id="biography"
                                                name="biography"
                                                value={formData.biography}
                                                onChange={handleInputChange}
                                                placeholder="Parlez-nous de vous..."
                                                className={`min-h-[100px] ${errors.biography ? "border-red-500" : ""}`}
                                            />
                                            <div className="flex justify-between items-center">
                                                <p className={`text-sm ${formData.biography.length > 200 ? "text-red-500" : "text-gray-400"}`}>
                                                    {formData.biography.length}/200 caractères
                                                </p>
                                                {errors.biography && (
                                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {errors.biography}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-6">
                                <Card className="border-gray-200 bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-gray-600">Changer le mot de passe</CardTitle>
                                        <CardDescription>{"Assurez-vous d'utiliser un mot de passe fort et unique"}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword" className="text-gray-600">
                                                Mot de passe actuel
                                            </Label>
                                            <Input
                                                id="currentPassword"
                                                name="currentPassword"
                                                type="password"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className={errors.currentPassword ? "border-red-500" : ""}
                                            />
                                            {errors.currentPassword && (
                                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.currentPassword}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword" className="text-gray-600">
                                                Nouveau mot de passe
                                            </Label>
                                            <Input
                                                id="newPassword"
                                                name="newPassword"
                                                type="password"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className={errors.newPassword ? "border-red-500" : ""}
                                            />
                                            {errors.newPassword && (
                                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.newPassword}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword" className="text-gray-600">
                                                Confirmer le mot de passe
                                            </Label>
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className={errors.confirmPassword ? "border-red-500" : ""}
                                            />
                                            {errors.confirmPassword && (
                                                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.confirmPassword}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password validation indicators */}
                                        {formData.newPassword && (
                                            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 space-y-2">
                                                <p className="font-medium text-blue-600 text-sm">Critères du mot de passe :</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                    <div
                                                        className={`flex items-center gap-2 ${passwordValidations.length ? "text-green-600" : "text-gray-500"}`}
                                                    >
                                                        {passwordValidations.length ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                        <span>Au moins 8 caractères</span>
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-2 ${passwordValidations.uppercase ? "text-green-600" : "text-gray-500"}`}
                                                    >
                                                        {passwordValidations.uppercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                        <span>Une majuscule (A-Z)</span>
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-2 ${passwordValidations.lowercase ? "text-green-600" : "text-gray-500"}`}
                                                    >
                                                        {passwordValidations.lowercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                        <span>Une minuscule (a-z)</span>
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-2 ${passwordValidations.number ? "text-green-600" : "text-gray-500"}`}
                                                    >
                                                        {passwordValidations.number ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                        <span>Un chiffre (0-9)</span>
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-2 ${passwordValidations.special ? "text-green-600" : "text-gray-500"} md:col-span-2`}
                                                    >
                                                        {passwordValidations.special ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                        <span>Un caractère spécial (!@#$%^&*)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <div className="flex justify-end mt-6">
                                <Button type="submit" className="bg-green-400 hover:bg-green-500 text-green-50" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>Enregistrement...</>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Enregistrer les modifications
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Tabs>
                </div>
            </div>
            <Toaster />
        </BasePage>
    )
}
