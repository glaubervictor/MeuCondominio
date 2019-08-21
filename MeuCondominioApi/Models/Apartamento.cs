using System.Collections.Generic;

namespace MeuCondominioApi.Models
{
    public class Apartamento : Base<Apartamento>
    {
        #region Propriedades

        public int Numero { get; set; }
        public virtual ICollection<Morador> Moradores { get; set; }

        #endregion

        #region Construtor

        public Apartamento()
        {
            Moradores = new List<Morador>();
        }

        #endregion

    }
}
