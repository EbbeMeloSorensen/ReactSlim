using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.People.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var people = Enumerable
                    .Range(1, 100)
                    .Select(i => new Person{
                        Title = $"Person {i}",
                        Description = $"Description {i}",
                        Deadline = DateTime.UtcNow.AddDays(i - 20),
                        Completed = i % 3 == 0
                    })
                    .ToList();

                await context.People.AddRangeAsync(people);
                await context.SaveChangesAsync();
            }
        }
    }
}
