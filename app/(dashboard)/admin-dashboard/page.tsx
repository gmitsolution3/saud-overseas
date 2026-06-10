// app/admin/dashboard/page.tsx
"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/swr/useFetch";
import { formatDate } from "@/utils";
import {
  Briefcase,
  Calendar,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  serviceCount: number;
  destinationCount: number;
  galleryCount: number;
  contactCount: number;
  recentContacts: Array<{
    _id: string;
    name: string;
    phone: string;
    email: string;
    visa_type: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface DashboardResponse {
  success: boolean;
  statusCode: number;
  status: string;
  message: string;
  data: DashboardStats;
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useFetch<DashboardResponse>(
    "/dashboard"
  );

  const stats = data?.data;
  const recentContacts = stats?.recentContacts || [];

  // Stats cards data
  const statCards = [
    {
      title: "Total Services",
      value: stats?.serviceCount || 0,
      icon: Briefcase,
      color: "bg-blue-500",
      bgColor: "bg-blue-500/80",
      link: "/admin/services",
    },
    {
      title: "Destinations",
      value: stats?.destinationCount || 0,
      icon: MapPin,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-500/80",
      link: "/admin/destinations",
    },
    {
      title: "Gallery Items",
      value: stats?.galleryCount || 0,
      icon: Globe,
      color: "bg-purple-500",
      bgColor: "bg-purple-500/80",
      link: "/admin/gallery",
    },
    {
      title: "Contact Messages",
      value: stats?.contactCount || 0,
      icon: Mail,
      color: "bg-amber-500",
      bgColor: "bg-amber-500/80",
      link: "/admin/contacts",
    },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <DashboardError />;
  }

  return (
    <div className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Welcome back! Here's an overview of your website activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link href={stat.link} key={index}>
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">
                        Total count
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 text-white`} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Contacts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contacts Table */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Contact Messages</h2>
              <Link href="/admin/contacts">
                <button className="text-sm text-primary hover:underline">
                  View all →
                </button>
              </Link>
            </div>
            {recentContacts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Visa Type</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentContacts.map((contact) => (
                      <TableRow key={contact._id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{contact.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {contact.visa_type || "Not specified"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {formatDate(contact.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No contact messages yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  When clients submit the contact form, they'll appear here
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Stats & Activity */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin-dashboard/services" className="inline-flex w-full">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Add New Service</p>
                    <p className="text-xs text-muted-foreground">
                      Create a new service offering
                    </p>
                  </div>
                </button>
              </Link>
              <Link href="/admin-dashboard/destinations" className="inline-flex w-full">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Add Destination</p>
                    <p className="text-xs text-muted-foreground">
                      Add a new country or region
                    </p>
                  </div>
                </button>
              </Link>
              <Link href="/admin-dashboard/galleries" className="inline-flex w-full">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Add Gallery Item</p>
                    <p className="text-xs text-muted-foreground">
                      Upload new tour images
                  </p>
                  </div>
                </button>
              </Link>
            </div>
          </Card>

          {/* Recent Activity Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentContacts.slice(0, 3).map((contact, index) => (
                <div key={contact._id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      New message from {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {contact.visa_type || "General inquiry"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              {recentContacts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </Card>

          {/* Contact Info Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Support: +1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">support@yourdomain.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Mon-Fri: 9AM - 6PM</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Dashboard Skeleton Loader
function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 w-48 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-96 bg-muted animate-pulse rounded mt-2"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-xl border bg-card">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="h-12 w-12 bg-muted animate-pulse rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl border bg-card">
            <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted animate-pulse rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                    <div className="h-3 w-48 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6 rounded-xl border bg-card">
            <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Error Component
function DashboardError() {
  return (
    <div className="container mx-auto px-5 lg:px-0 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <TrendingUp className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Failed to Load Dashboard</h2>
        <p className="text-muted-foreground mb-6">
          There was an error loading the dashboard data. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}