using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MotoXpressFinalProject.Models;

public partial class MotoXpressFinalContext : DbContext
{
    public MotoXpressFinalContext()
    {
    }

    public MotoXpressFinalContext(DbContextOptions<MotoXpressFinalContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bike> Bikes { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Rentalrecord> Rentalrecords { get; set; }

    public virtual DbSet<Revokedtoken> Revokedtokens { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Userprofile> Userprofiles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(localdb)\\MsSqlLocalDb;Initial Catalog=MotoXpressFinal;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Bike>(entity =>
        {
            entity.HasKey(e => e.BikeId).HasName("PK__bikes__7DC81721C8C0EC2C");

            entity.ToTable("bikes");

            entity.HasIndex(e => e.BikeNumber, "UC_BikeNumber").IsUnique();

            entity.Property(e => e.BikeDescription)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.BikeName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.BikeNumber)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.BikePhoto)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.IsAvailable).HasColumnName("isAvailable");
            entity.Property(e => e.PerDayRental).HasColumnType("decimal(7, 2)");

            entity.HasOne(d => d.AvailableCity).WithMany(p => p.Bikes)
                .HasForeignKey(d => d.AvailableCityId)
                .HasConstraintName("fk_city_bikes_cityid");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.CityId).HasName("PK__city__F2D21B76F715EBC6");

            entity.ToTable("city");

            entity.Property(e => e.CityName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Rentalrecord>(entity =>
        {
            entity.HasKey(e => e.RentalRecordId).HasName("PK__rentalre__D2BC2770EA5ED8A4");

            entity.ToTable("rentalrecords");

            entity.Property(e => e.BookingDate).HasColumnType("datetime");
            entity.Property(e => e.RentalEndDate).HasColumnType("datetime");
            entity.Property(e => e.RentalStartDate).HasColumnType("datetime");

            entity.HasOne(d => d.Bike).WithMany(p => p.Rentalrecords)
                .HasForeignKey(d => d.BikeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_bikes_rentalrecords_bikeid");

            entity.HasOne(d => d.DropOffCity).WithMany(p => p.RentalrecordDropOffCities)
                .HasForeignKey(d => d.DropOffCityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_city_rentalrecords_dropoffcityid_cityid");

            entity.HasOne(d => d.PickupCity).WithMany(p => p.RentalrecordPickupCities)
                .HasForeignKey(d => d.PickupCityId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_city_rentalrecords_pickupcityid_cityid");

            entity.HasOne(d => d.User).WithMany(p => p.Rentalrecords)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_users_rentalrecords_userid");
        });

        modelBuilder.Entity<Revokedtoken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__revokedt__3214EC07D96BDACD");

            entity.ToTable("revokedtoken");

            entity.HasIndex(e => e.Token, "UQ_Token").IsUnique();

            entity.Property(e => e.RevokedAt).HasColumnType("datetime");
            entity.Property(e => e.Token)
                .HasMaxLength(300)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__users__1788CC4CEA088FF8");

            entity.ToTable("users");

            entity.HasIndex(e => e.EmailId, "UC_EmailId").IsUnique();

            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UserFullName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Userprofile>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__tmp_ms_x__1788CC4C04736CFD");

            entity.ToTable("userprofiles");

            entity.HasIndex(e => e.Dlnumber, "UC_DLNumber").IsUnique();

            entity.HasIndex(e => e.PhoneNumber, "UC_PhoneNumber").IsUnique();

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Dlnumber)
                .HasMaxLength(16)
                .IsUnicode(false)
                .HasColumnName("DLNumber");
            entity.Property(e => e.DluploadedDocument).HasColumnName("DLUploadedDocument");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.City).WithMany(p => p.Userprofiles)
                .HasForeignKey(d => d.CityId)
                .HasConstraintName("fk_city_userprofiles_cityid");

            entity.HasOne(d => d.User).WithOne(p => p.Userprofile)
                .HasForeignKey<Userprofile>(d => d.UserId)
                .HasConstraintName("fk_users_userprofile_userid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
