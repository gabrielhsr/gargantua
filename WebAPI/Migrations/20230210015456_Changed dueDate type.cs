using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Financial.Migrations
{
    /// <inheritdoc />
    public partial class ChangeddueDatetype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DueDateTemp",
                table: "PaymentMethods",
                type: "int",
                nullable: true);

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "PaymentMethods");

            migrationBuilder.RenameColumn(
                name: "DueDateTemp",
                table: "PaymentMethods",
                newName: "DueDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "DueDate",
                table: "PaymentMethods",
                type: "datetimeoffset",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
