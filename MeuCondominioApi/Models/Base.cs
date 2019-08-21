using FluentValidation;
using FluentValidation.Results;
using System;

namespace MeuCondominioApi.Models
{
    public abstract class Base<T> 
    {
        public Guid Id { get; set; }

        public Base()
        {
            Id = Guid.NewGuid();
        }

        public Base(Guid id)
        {
            Id = id;
        }

        public override bool Equals(object obj)
        {
            var compareTo = obj as Base<T>;

            if (ReferenceEquals(this, compareTo))
            {
                return true;
            }

            if (compareTo is null) return false;

            return Id.Equals(compareTo.Id);
        }

        public static bool operator ==(Base<T> a, Base<T> b)
        {
            if (a is null && b is null)
                return true;

            if (a is null || b is null)
                return false;

            return a.Equals(b);
        }

        public static bool operator !=(Base<T> a, Base<T> b)
        {
            return !(a == b);
        }

        public override int GetHashCode()
        {
            return (GetType().GetHashCode() * 907) + Id.GetHashCode();
        }

        public override string ToString()
        {
            return GetType().Name + "[Id = " + Id + "]";
        }
    }
}
