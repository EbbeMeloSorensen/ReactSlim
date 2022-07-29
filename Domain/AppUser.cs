using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = null!;

        public ICollection<ActivityAttendee> Activities { get; set; } = new List<ActivityAttendee>();
        public ICollection<UserFollowing> Followings { get; set; } = new List<UserFollowing>();
        public ICollection<UserFollowing> Followers { get; set; } = new List<UserFollowing>();
    }
}