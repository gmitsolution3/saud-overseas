"use client";

import TableLoader from "@/components/TableLoader";
import ContactEmpty from "@/components/admin/contacts/ContactEmpty";
import ViewContactModal from "@/components/admin/contacts/ViewContactModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDelete } from "@/hooks/swr/useDelete";
import { useFetch } from "@/hooks/swr/useFetch";
import { IContact } from "@/types";
import { formatDate } from "@/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Calendar,
  Eye,
  Mail,
  MoreHorizontal,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AdminContactsPage() {
  const { data, isLoading } = useFetch<{ data: IContact[] }>(
    "/contacts",
  );

  const { mutate: deleteContact, isLoading: isDeleting } = useDelete(
    "/contacts",
    {
      revalidateKey: "/contacts",
    },
  );

  const contacts: IContact[] = data?.data || [];

  const [selectedContact, setSelectedContact] =
    useState<IContact | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewContact = (item: IContact) => {
    setSelectedContact(item);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting message from "${name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#232156",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait",
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });

          await deleteContact(id);

          Swal.fire({
            title: "Deleted!",
            text: "Contact message has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete contact message",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<IContact>[] = [
    {
      accessorKey: "name",
      header: "Contact",
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-semibold truncate">
                {row.getValue("name")}
              </div>
              {!row.original.isRead && (
                <Badge
                  variant="default"
                  className="gap-1 text-xs bg-blue-500"
                >
                  New
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">
                {row.original.email}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {row.original.phone}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "visa_type",
      header: "Visa Type",
      size: 150,
      cell: ({ row }) => (
        <Badge variant="secondary" className="text-sm">
          {row.getValue("visa_type")}
        </Badge>
      ),
    },
    {
      accessorKey: "message",
      header: "Message Preview",
      size: 300,
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground line-clamp-2">
          {row.original.message}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Received",
      size: 150,
      cell: ({ row }) => (
        <div>
          <div className="flex items-center text-sm font-medium">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
            {formatDate(row.getValue("createdAt"))}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ID: {row.original._id.slice(-6)}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-primary !p-0"
            onClick={() => handleViewContact(row.original)}
            disabled={isDeleting}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-primary !p-0"
                disabled={isDeleting}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => handleViewContact(row.original)}
                className="hover:text-white! hover:bg-primary!"
                disabled={isDeleting}
              >
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleDelete(row.original._id, row.original.name)
                }
                className="text-destructive hover:text-white! hover:bg-primary!"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableLoader />;
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Contact Messages
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              View and manage inquiries from potential clients
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Total: {contacts.length} messages
            </Badge>
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden border shadow-sm p-0">
          <div className="overflow-x-auto">
            <Table className="table-fixed w-full">
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className="h-11 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/50 transition-colors group border-b last:border-0"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className="px-6 py-5"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-60 text-center"
                    >
                      <ContactEmpty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {isDetailModalOpen && selectedContact && (
        <ViewContactModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedContact={selectedContact}
        />
      )}
    </>
  );
}
