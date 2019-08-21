using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace MeuCondominioApi.Models
{
    public class ContextoDados : IdentityDbContext<Usuario, IdentityRole<Guid>, Guid>
    {
        public DbSet<Apartamento> Apartamentos { get; set; }
        public DbSet<Morador> Moradores { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        public ContextoDados(DbContextOptions<ContextoDados> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Resolvendo Bug MySQL campo Guid. //https://github.com/jasonsturges/mysql-dotnet-core

            builder.Entity<Apartamento>(entity =>
            {
                entity.Property(m => m.Id).HasMaxLength(127);
                entity.Ignore(m => m.QuantidadeMoradores);
            });

            builder.Entity<Morador>(entity =>
            {
                entity.Property(m => m.Id).HasMaxLength(127);
                entity.Ignore(m => m.DataNascimentoFormatada);
            });

            builder.Entity<Usuario>(entity =>
            {
                entity.Property(m => m.Id).HasMaxLength(127);
                entity.Property(m => m.EmailConfirmed).HasConversion(new BoolToZeroOneConverter<short>());
                entity.Property(m => m.PhoneNumberConfirmed).HasConversion(new BoolToZeroOneConverter<short>());
                entity.Property(m => m.TwoFactorEnabled).HasConversion(new BoolToZeroOneConverter<short>());
                entity.Property(m => m.LockoutEnabled).HasConversion(new BoolToZeroOneConverter<short>());
            });

            //Ignorar estas tabelas que não serão usadas.

            builder.Ignore<IdentityRole<Guid>>();
            builder.Ignore<IdentityUserRole<Guid>>();
            builder.Ignore<IdentityUserClaim<Guid>>();
            builder.Ignore<IdentityUserLogin<Guid>>();
            builder.Ignore<IdentityRoleClaim<Guid>>();
            builder.Ignore<IdentityUserToken<Guid>>();

            //Ignorar colunas de validação.

            builder.Entity<Apartamento>()
                .ToTable("Apartamentos");

            builder.Entity<Morador>()
                .HasOne<Apartamento>()
                .WithMany(m => m.Moradores)
                .HasForeignKey(m => m.ApartamentoId);

            builder.Entity<Morador>().ToTable("Moradores");
            builder.Entity<Usuario>().ToTable("Usuarios");

        }
    }
}
