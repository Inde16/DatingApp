using System;

namespace DatingApp.API.Modules
{
    public class Photo
    {
        public int id { get; set; }
        public string Url { get; set; }
        public string Descreption{ get; set;}
        public DateTime DateAdded{ get; set; }
        public bool IsMain{ get; set; }
        public User User { get; set; }
        public int UserId { get; set; }

    }
}