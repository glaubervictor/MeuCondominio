using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace MeuCondominioApi.Models
{
    public class ContextoDados : IdentityDbContext<Usuario, IdentityRole<int>, int>
    {
        public DbSet<Apartamento> Apartamentos { get; set; }
        public DbSet<Morador> Moradores { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        public ContextoDados(DbContextOptions<ContextoDados> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Apartamento>(entity =>
            {
                entity.Ignore(m => m.QuantidadeMoradores);
            });

            builder.Entity<Morador>(entity =>
            {
                entity.Ignore(m => m.DataNascimentoFormatada);
            });

            builder.Entity<Usuario>(entity =>
            {
                entity.Property(m => m.EmailConfirmed).HasConversion(new BoolToZeroOneConverter<short>());
                entity.Property(m => m.PhoneNumberConfirmed).HasConversion(new BoolToZeroOneConverter<short>());
                entity.Property(m => m.TwoFactorEnabled).HasConversion(new BoolToZeroOneConverter<short>());
                entity.Property(m => m.LockoutEnabled).HasConversion(new BoolToZeroOneConverter<short>());
            });

            //Ignorar estas tabelas que não serão usadas.

            builder.Ignore<IdentityRole<int>>();
            builder.Ignore<IdentityUserRole<int>>();
            builder.Ignore<IdentityUserClaim<int>>();
            builder.Ignore<IdentityUserLogin<int>>();
            builder.Ignore<IdentityRoleClaim<int>>();
            builder.Ignore<IdentityUserToken<int>>();

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
