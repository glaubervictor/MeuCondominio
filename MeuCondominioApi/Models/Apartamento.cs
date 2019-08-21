using System.Collections.Generic;
using System.Linq;

namespace MeuCondominioApi.Models
{
    public class Apartamento : Base<Apartamento>
    {
        #region Propriedades

        public int Numero { get; set; }
        public virtual ICollection<Morador> Moradores { get; set; }
        public int QuantidadeMoradores { get { return Moradores != null ? Moradores.Count() : 0; } }

        #endregion

        #region Construtor

        public Apartamento()
        {
            Moradores = new List<Morador>();
        }

        #endregion

    }
}
