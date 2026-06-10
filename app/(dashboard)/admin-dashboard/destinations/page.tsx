"use client";

import TableLoader from "@/components/TableLoader";
import CreateDestinationModal from "@/components/admin/destinations/CreateDestinationModal";
import EditDestinationModal from "@/components/admin/destinations/EditDestinationModal";
import DestinationEmpty from "@/components/admin/destinations/DestinationEmpty";
import ViewDestinationModal from "@/components/admin/destinations/ViewDestinationModal";
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
import { IDestination } from "@/types";
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
  MapPin,
  MoreHorizontal,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AdminDestinationsPage() {
  const { data, isLoading, refetch } = useFetch<{ data: IDestination[] }>(
    "/destinations",
  );

  const { mutate: deleteDestination, isLoading: isDeleting } = useDelete(
    "/destinations",
    {
      revalidateKey: "/destinations",
    },
  );

  const destinations: IDestination[] = data?.data || [];

  const [selectedDestination, setSelectedDestination] =
    useState<IDestination | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [destinationToEdit, setDestinationToEdit] = useState<IDestination | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleViewDestination = (item: IDestination) => {
    setSelectedDestination(item);
    setIsDetailModalOpen(true);
  };

  const handleEditDestination = (item: IDestination) => {
    setDestinationToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting "${name}"!`,
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

          await deleteDestination(id);

          Swal.fire({
            title: "Deleted!",
            text: "Destination has been deleted successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text:
              error.response?.data?.message ||
              "Failed to delete destination",
            icon: "error",
          });
        }
      }
    });
  };

  // Define table columns
  const columns: ColumnDef<IDestination>[] = [
    {
      accessorKey: "name",
      header: "Destination",
      size: 300,
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden relative">
            {row.original.img ? (
              <Image
                src={row.original.img}
                alt={row.original.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-semibold text-primary">
                {row.original.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-semibold truncate">
                {row.getValue("name")}
              </div>
              {row.original.img && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <ImageIcon className="h-3 w-3" />
                  Has Image
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Destination
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "cats",
      header: "Categories",
      size: 250,
      cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-medium">
              {row.original.cats?.length || 0} categories
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {row.original.cats?.slice(0, 3).map((cat, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
              >
                {cat}
              </Badge>
            ))}
            {(row.original.cats?.length || 0) > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{row.original.cats.length - 3}
              </Badge>
            )}
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
            onClick={() => handleViewDestination(row.original)}
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
                onSelect={() => handleEditDestination(row.original)}
                className="hover:text-white! hover:bg-primary!"
                disabled={isDeleting}
              >
                Edit item
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
    data: destinations,
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
              Destinations
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage countries and regions where you offer services
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm text-white border-0"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={isDeleting}
          >
            Add New Destination
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
                      <DestinationEmpty
                        onCreateClick={() => setIsCreateModalOpen(true)}
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
        <CreateDestinationModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          onSuccess={refetch}
        />
      )}

      {isDetailModalOpen && selectedDestination && (
        <ViewDestinationModal
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
          selectedDestination={selectedDestination}
        />
      )}

      {isEditModalOpen && destinationToEdit && (
        <EditDestinationModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          destinationData={destinationToEdit}
          onSuccess={refetch}
        />
      )}
    </>
  );
}