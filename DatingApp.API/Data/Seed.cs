using System.Collections.Generic;
using DatingApp.API.Modules;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            this._context = context;

        }

        public void SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                byte[] passwordHash , passwordSalt;
                CreatePasswordHas("password" , out passwordHash , out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Name = user.Name.ToLower();

                _context.Users.Add(user);
            }

            _context.SaveChanges();
        }

         private void CreatePasswordHas(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hwin = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hwin.Key;
                passwordHash = hwin.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
    }
}