// app/admin/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Lock,
  Settings,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Change Password Schema
const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!._-])[A-Za-z\d@#$%^&*!._-]{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@#$%^&*!._-)",
      ),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Password strength calculator
const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@#$%^&*!._-]/.test(password)) score++;
  return score;
};

const getStrengthMeta = (score: number) => {
  if (score <= 2) {
    return {
      label: "Weak",
      color: "bg-red-500",
      textColor: "text-red-600",
    };
  }
  if (score === 3 || score === 4) {
    return {
      label: "Medium",
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    };
  }
  return {
    label: "Strong",
    color: "bg-green-500",
    textColor: "text-green-600",
  };
};

export default function AdminSettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");
  const score = getPasswordStrength(newPassword || "");
  const { label, color, textColor } = getStrengthMeta(score);

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      notify.success("Password changed successfully!");
      reset();
    } catch (error: any) {
      console.error(error);
      notify.error(error?.message || "Failed to change password");
    }
  };

  return (
    <div className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Settings
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5">
            Manage your account settings and security preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-8">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-primary/10 text-primary transition-all">
                <Lock className="h-4 w-4" />
                Change Password
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 rounded-lg transition-all">
                <Shield className="h-4 w-4" />
                Security
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 rounded-lg transition-all">
                <Key className="h-4 w-4" />
                API Keys
              </button>
            </nav>
          </Card>
        </div>

        {/* Change Password Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-1">
                Change Password
              </h2>
              <p className="text-sm text-muted-foreground">
                Update your password to keep your account secure
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Current Password Field */}
              <FieldSet>
                <Field>
                  <FieldLabel>
                    Current Password{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type={
                          showCurrentPassword ? "text" : "password"
                        }
                        placeholder="Enter your current password"
                        className="pl-10 pr-10"
                        {...register("currentPassword")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  </FieldContent>
                  <FieldError>
                    {errors.currentPassword?.message}
                  </FieldError>
                </Field>
              </FieldSet>

              {/* New Password Field */}
              <FieldSet>
                <Field>
                  <FieldLabel>
                    New Password{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password (min. 8 characters)"
                        className="pl-10 pr-10"
                        {...register("newPassword")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword(!showNewPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  </FieldContent>
                  <FieldDescription>
                    Password must contain at least 1 uppercase letter,
                    1 lowercase letter, 1 number, and 1 special
                    character (@#$%^&*!._-)
                  </FieldDescription>
                  <FieldError>
                    {errors.newPassword?.message}
                  </FieldError>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Password Strength
                        </span>
                        <span
                          className={`text-xs font-medium ${textColor}`}
                        >
                          {label}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${color}`}
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-1.5 text-xs">
                          {newPassword.length >= 8 ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span
                            className={
                              newPassword.length >= 8
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }
                          >
                            Min. 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          {/[A-Z]/.test(newPassword) ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span
                            className={
                              /[A-Z]/.test(newPassword)
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }
                          >
                            Uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          {/[a-z]/.test(newPassword) ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span
                            className={
                              /[a-z]/.test(newPassword)
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }
                          >
                            Lowercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          {/\d/.test(newPassword) ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span
                            className={
                              /\d/.test(newPassword)
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }
                          >
                            Number
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs col-span-2">
                          {/[@#$%^&*!._-]/.test(newPassword) ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span
                            className={
                              /[@#$%^&*!._-]/.test(newPassword)
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }
                          >
                            Special character (@#$%^&*!._-)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </Field>
              </FieldSet>

              {/* Confirm Password Field */}
              <FieldSet>
                <Field>
                  <FieldLabel>
                    Confirm New Password{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        placeholder="Confirm your new password"
                        className="pl-10 pr-10"
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    </div>
                  </FieldContent>
                  <FieldError>
                    {errors.confirmPassword?.message}
                  </FieldError>
                </Field>
              </FieldSet>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 text-white"
                >
                  {isSubmitting
                    ? "Changing Password..."
                    : "Change Password"}
                </Button>
                <Button
                  type="button"
                  onClick={() => reset()}
                  variant="outline"
                  className="hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>

            {/* Security Tips */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Security Tips:
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Use at least 8 characters for your password
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Combine uppercase and lowercase letters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Include numbers and special characters (@#$%^&*!._-)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Don't reuse passwords across different accounts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Change your password regularly for better security
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
