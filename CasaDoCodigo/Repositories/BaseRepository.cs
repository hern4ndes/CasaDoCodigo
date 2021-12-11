
using CasaDoCodigo.Models;
using Microsoft.EntityFrameworkCore;

namespace CasaDoCodigo.Repositories
{
   
    public class BaseRepository<T> where  T : BaseModel
    {
        protected readonly ApplicationContext contexto;
        protected readonly DbSet<T> dbSet;

        public BaseRepository(ApplicationContext context)
        {
            this.contexto = context;
            dbSet =  context.Set<T>();
        }
    }
}
