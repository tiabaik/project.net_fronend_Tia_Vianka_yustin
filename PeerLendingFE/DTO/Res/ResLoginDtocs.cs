﻿namespace PeerLendingFE.DTO.Res
{
    public class ResLoginDtocs
    {
        public class LoginResponse
        {
            public bool Success { get; set; }
            public string message { get; set; }
            public UserData data { get; set; }
        }
        public class UserData
        {
            //public int Id { get; set; }
            //public string Name { get; set; }
            //public string Email { get; set; }
            //public string Role { get; set; }
            public string jwtToken { get; set; }
        }
    }
}
