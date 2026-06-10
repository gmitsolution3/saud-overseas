"use client";

import TableLoader from "@/components/TableLoader";
import CreateServiceModal from "@/components/admin/services/CreateServiceModal";
import EditServiceModal from "@/components/admin/services/EditServiceModal";
import ServiceEmpty from "@/components/admin/services/ServiceEmpty";
import ViewServiceModal from "@/components/admin/services/ViewServiceModal";
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
import { IService } from "@/types";
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
  ImageIcon,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

import { useState } from "react";
import Swal from "sweetalert2";

export default function AdminServicesPage() {
  const { data, isLoading, refetch } = useFetch<{ data: IService[] }>(
    "/services",
  );

  const { mutate: deleteService, isLoading: isDeleting } = useDelete(
    "/services",
    {
      revalidateKey: "/services",
    },
  );

  const services: IService[] = data?.data || [];

  const [selectedService, setSelectedService] =
    useState<IService | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<IService | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleViewService = (item: IService) => {
    setSelectedService(item);
    setIsDetailModalOpen(true);
  };

  const handleEditService = (item: IService) => {
    setServiceToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting "${title}"!`,
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

          await deleteService(id);

          Swal.fire({
            title: "Deleted!",
            text: "Service has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete service",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<IService>[] = [
    {
      accessorKey: "title",
      header: "Service",
      size: 350,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden relative">
            {row.original.image ? (
              <Image
                src={row.original.image}
                alt={row.original.title}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-primary">
                {row.original.title.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-semibold truncate">
                {row.getValue("title")}
              </div>
              {row.original.image && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <ImageIcon className="h-3 w-3" />
                  Has Image
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {row.original.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
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
            onClick={() => handleViewService(row.original)}
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
                onSelect={() => handleEditService(row.original)}
                className="hover:text-white! hover:bg-primary!"
                disabled={isDeleting}
              >
                Edit item
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleDelete(row.original._id, row.original.title)
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
    data: services,
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
              Services
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your service offerings and showcase what you
              provide
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white border-0"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={isDeleting}
          >
            Add New Service
          </Button>
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
                      <ServiceEmpty
                        onCreateClick={() =>
                          setIsCreateModalOpen(true)
                        }
                        isDeleting={isDeleting}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {isCreateModalOpen && (
        <CreateServiceModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isDetailModalOpen && selectedService && (
        <ViewServiceModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedService={selectedService}
        />
      )}

      {isEditModalOpen && serviceToEdit && (
        <EditServiceModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          serviceData={serviceToEdit}
          onSuccess={refetch}
        />
      )}
    </>
  );
}
