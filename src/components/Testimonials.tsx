import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "",
    name: "Vibhor Sharma",
    userName: "@vibhor_420",
    comment: "This website is awesome!",
  },
  {
    image: "",
    name: "Vansh Nagpal",
    userName: "@vansh_nagpal69",
    comment: "It saves a lot of time and i can get study resources from here.",
  },

  {
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBAQEBAVEBAQEBAVEBUQFRUVEA8QFREXFhUWFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADsQAAEDAgQEAwcDAgQHAAAAAAEAAhEDIQQSMUEFUWFxIjKBBhNCkaGxwVPR8FJyM2Lh8RQjQ1SCkqL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+10dApT1P934VUNArp6nv+EDSUD3EC1+fZE8KAgoLUS3MMzOiYEFAq1FEEUUJUQWqUUQcup/if8Asjp6u9ED/P6O+6Onq70+yAysHEtW/wBv5K3lYOJC7f7fyUGKVSyY/iNKgJe7b4YJHRc3De1FCoJgtGt48uxt0vCDuqiseE4rRqmGv8R0DgQT81sKClRCtQoFkIXBMhC4IElAU4hLIQLKqERCkIAIQkJkISEAEISjKEhABQkIyFRCAFFZUQfQqOgUpanufsFdHQKqW/c/ZBTnkHSfujbU/kK3FJbXBNr2ugMV23vp0KMuQ5yPh15IhfVAQUQ5gLIKbSHOk8kDVFEN+aAlRdcBASQR115BMQcx3n9HfdHT1Pp9kJ8/ofujZqfRARXE9pOLUsO05ngVPd2BNxe/0+67htc6BfCvarEVcbj6gJyta4i2zRpCDj+0fGHVnuIMS4j0/wBlOAV/EM/kaQXD+ojQLoO4RSMjluuhwj2cpEeIuI2vob/uUGvB8Ua57HuHie8uAEAMY2IN9ALX6L2nCcQXNyvJLpJaT8TZ59JXCoeydKow5HOa8ABp67JvBfeUmxWmabwDpAgwSEHp4VEJhCohAuEJCaQgIQKIQEJpCAhAshVCMhCQgAhCQmEISgWQhKYUBQAUJRlCUAK1FaD6BS0HZSnv3KunoOyEGATyzFAZvZZnUQw9NeydTqFwsLwNdjCudtyLhBUN6/VJNZzSG5THPUQmudlBJnXVG19rGUAU2Etg899QE2UuHbEXP0R5OaARXBJbyTEs0WzMXVMfqI0sEBhwmDr+EQKzV2S5pG2vXomNvGxE22QY/j9D90bPMUIHj/8AE/dEzzOQK4i9zaNVzYzCm7LOkxaei+Lu8VStVbMOc9oJ1dBgk9yvrntRjW0MLVe4ZgQGAAxd9hdfNeMilSpspGziXPN4nMSWifX6oOfSoGYnVdbBeA5NSuBw3HMDr1MzSTG8RrBXpK59zQbiZaBUMNLpOh5Dsg9XwWi6MxED8rke0xy54sSTPW0/ZH7N8RxFUB1nUpgloAjuJlV7W4Rz6tINBc5wAMaC5GY9IQd3CT7unNzkbJ52CYUYaAABoBZUQgAhAUwhCQgU5AUwoCEAFCUZQlABQlGQqhAsoSEwhCQgUQqITIVEIFQoihRB75n4QHR3ZyOn+FUWPYoMVPEBoaCfERBHon0wAYJgx8kBDQbtFjJdCIODzmab3mdEBvMxvHJVT+I6czKW20EGCTBCdk5ET1QXQuAZRPdB+0alCXAQCeUJsboF1HEX6Gw5rIKjoOszc9k2rGfX4YjrKNuUC8dOyCvEd997bbI6JOhjf1CHPmbAO8E7BDhsw8wFyYI5DRAsjxen5V0/M70R1G39Eul5nIOb7W8OdicJVp0/8QZX0+r2mR+V804q33hY8wT7pgMaEtblP1BX2NeF9vsMBVpuiMzNuYJlB4E4NpPlvyC91T4RSr8MpsfILQSDyfmn5XheMrs8Q8WUE3veJXtODxVoAOJBIg+K0Nccvh0HdAv2ZwVOh4GsylzpcZNzuZ3XU4x7xz3MptDmvo1abiRZjiw5DPc/Rb6OEa2CE0CJA3MnugClTyta3XK0C+pgQrKJUgAoCmFCUCiEBCaUBCBRCohMIQkIFkKoRlCQgAhUQjhUUC4QkIyqKBcKKyog9wHQoHwhO382UI/P2QBIuL36qmFo2n1SnuJuDAOmiFriPMd7xFgge9zT8KpsAg3sfmlPBIlrhPUC6z1H1rQB6BBuqEOP+11J0uYG1kqiHFs/F2EA9UFYVWA6OtIy/sg0NY3MXRczKLIwEHLposj8VDW/1EakW7qs1YxBbG6DUXgTFgTJAhHRrg2usoc+Ic0Tz2Pom0J/phAdWpJSqHmd3/Cp7rj1V4cEZnEQJtNp7IHrh+1eCFWkToabC4HtqPVPrcaDSW+7M9SPwsXFK7sVhcYyA0+5AbGxJ5/JB8zxuBpPdL2SbQREr1Xs5wtgogCiIJkG2YGeY0Xk+EY81GtzCHaOB2cLEfNev4Ljcou4Achsg9RTIADdYstNahLWVGCWva027L537Qe0T3ZqWHnM/wADSPN4reHrdfUsJQLaDGbtpNb2IbCDkFUunicRHhbBMXJ0CztLTZ0HmdCEGMoSuhV4frkdMag6/NYajC0wRB6oFEICEwoCgAoSjKEoAKooiqKAChKIqigAoSiKEoAVqKIPanb+bIak5TGqI7fzZDWZmY4TEoMDARmzaTtoEAgiQbDQHknOoPLYtH179ULabWwCYJ5HVAoYpwAtzI5rS7GN8JAiRfoVkqQD+2yNjmuaQbHblHVA12MGUwfEHCBzCA4h5dItspiKDBJE6DTSUhpsToga7KRJGlrnTqlUqky1pPfqhA11tBtulUzBkWBKDe7RoJ0+6fhXuOp2MR0S6dQOFwBZMoYdrCS02DSfogw4/HFlmeYC8jTsubWrvd5nF24kndViH5nEgQ5oE/5huVZbLARsSCgz1icvYJmHxTaVJ+bR403cdglvNxyNj6rNWpExOgsOgQee4jwFwq1a+GbmpVIeaYP/ADKb48cDcEybXvouOcbNgbmwA1J5L3WHqZDGwP0WngnspR/4s483GtNkeEVp8VT9hzk8kHI9m+Af8OW4rEtPvoPuaRsGAjzP3zdOq+gYDijKwgeF+7T+Oa5fFBnd8/2/CwOohonfaNuqDdQdBqDYT63SmeKoxgvLgT6XSKdQhp5n6qYGtlc5+4EN7nVB6I1w05GeJ7iZ6cyegSuJ4eGtcL5bO6ydfmi4VQyjM7zvueg2C0Zg4vpncW7RdBwigKbUZlJB1BISygAoSjKEoAKEoyhKAChKMoSgAoSjKEoAVK1EHtXbfzZDV8hRO2UM5TGt0HP94adhe1+iSapcQANAdUbqbw4ib21WljmjwkX5xqUGb3Y0GpiO6acjCJWhuHFjrvayTXdc5gL6dAECcRUzeWw+8LPSbmMafsnsaRfVpjsEtoIdmaYN0BtptbmDr8lmYAHa6p76JMOMmUDqUkGIhAymwQb26qViQ3wmSTfYQANfqkYyo5oaBvKyGq+CM1jrYILyEOaToDY9ORWvD0hmq09rOHYjb+bLC17hYG3opTqPaZDoMRtogTiaOUlpQ0xmgb6J9QlxlxkoA2EGfE0RfMLhelpH3dNjB8LG+tr/AFXDqeLzXTTiXmPFppogbnzOJ0kknoFlqvzO6DRFmN+uqEBAL3QEXDGgvaHaAFzvuoWA2I1RUxlMjUoO5hsZGYutLrcsuyI12TnzXb8yOS5JfN3XjbZdHB4LRzx1AQXxagAQ8fFY94sVziu7imZ6ZG5aCO4uuEgEoSiKEoBKEoihKAShKMoCgEoCjKByAFFFEHtXbIhoqdqEbNEGU079/omNE2j1KY5A58R9UEccolZR5pNytb6g30KzPZeQgN4AAI7dkllIfNOAsRpOvNKZDdd9OiAzTA0ERupVYHd+iLPKFpuEHP4nTgN7n7LDC6fFfK3+63yXNQCUKIqigEqlZVIIooL6KBBaiisIJCsBQIggPJI9V28LXBaAdQFxKhho77I6FQjZw9LIO9TkwBoIXDxAh7h/md911sDic2vzXMxwio/+4/W6DOUJVlUgEqirKooBKEoihKACgcjKW5ACihUQe3dqPVWTDVR1RASEGWo8kSDbohDc2kjutNewnks9KqY0v9EELtAbjdUGzYJgE6j5ImgRG6BWTrqrawA3TAwwjFMIF5AdEmQAe5WrKVixTDldNpi/ITdBlxrw5oI2d+NuixFNeZ0HhG+3aUkoBKElWSgJQQlXSZmc1ukkBASoHEEEagyEHdp4BjZibiDfULj1gA5wEwCQJ1streL6SzvdYa9bO4uNpQCrCFWEBhE1AEQQbcPgm1hDnFoaQfCYnoei1P4U3/pEsI0/pKnBx5vT8rqBBzaLXTDwQ6NYkFZ+J0S1wcfi/Ef6Ltri8Wq5nxs0R67/AIQYShRIUFFCiKooBKAoyhKBZSymOS3IAUUUQe3Ku0CUJKjtEAua07qMYAhLgrF0Bho5q8gQF0aKweZQMZZWHBADaUNX5TsgaXjms2MbmY640+yuoR6/RAXCOZ+iDk1aoIAB0i3L0WV5XRx1FsZgL2+S5NR6COchJSy9CXoGSqlLL1XvEDpVgpIerD0D5Vyk51ecIHAo2lID0xr0Hc4Ro7uF0pXJ4UTBIn8FdGEBuqgLg1mkucQDBJ+67mVc7EgtcR6hBgNM8iq927kVrzKZkGP3Tv6Sq9y/+krbmV5kHLKAldWowO8wnrusdXBH4TPQ6oMbiluKOo0tsRB6pTigGVEKiD3BVubLeyFW82CBeWL6qNd/orAm0omjZBAY1+ijCJUVgoLaL/ZR7Rvc7ohaFBUEoF03gTaUGUcuyJzbmFABsUGeqAAZEhecxuBLyYcWSfh2XqMQPDfoubUYg8+eGu/Vd9Es8Lf+q76LuOYhLUHCdwp/6zvp+yUeD1f+4f8A/P7L0BCrKg4beEVP13/Jv7Jg4VU/Wd8h+y7IaihBxRwup+s75D9kQ4XU/Wd8guxCvKg5LeGv/VPyCfh8E5utQu7x+F0A1EGoOlw8/wDLbYCCQY+62ArmUa4pjSZVuxzjoA36lB0i8A6rHxAgxzuEnDNJNtTqUOJMPI5W+iAIVKSrlBSkq1IQVKkqQpCCnQbESOqx1uHtPlOU8jotkKoQcd2BqA+We0KLsKIOwqqHRRRBbRAmOyjeaiiCOI7qxooogIA6Kw3lsrUQKe6VQCpRAGJaQO6wvCiiBTglkKKIAIVQooguFYCtRBIVwoogsBEAoogKpt6p9HDiJKiiDVS8MEDULDXMucepVqIFq1FEEVyoogitRRBSkKKIJCiiiD//2Q==",
    name: "John Doe",
    userName: "@john_Doe2",
    comment:
      "The design and user experience is top notch. I can get study materials from here very easily.",
  },
  {
    image:
      "data:image/jpeg;base64,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",
    name: "Shreya",
    userName: "@shreya",
    comment:
      "Different themes and colors make it easy to navigate and find the resources needed.",
  },
  {
    image:
      "data:image/jpeg;base64,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",
    name: "Sachin Singh",
    userName: "@sachin_singh",
    comment: "I can get study materials from here very easily.",
  },
  {
    image:
      "https://www.shutterstock.com/shutterstock/photos/2153541715/display_1500/stock-photo-studio-close-up-portrait-of-happy-smiling-good-looking-woman-closeup-headshot-of-cheerful-2153541715.jpg",
    name: "Emily",
    userName: "@emily",
    comment:
      "Contact us and Feedback form is very good for any query or feedback and helps to point out any problem.",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32 -mt-24">
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why People Love{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Velocity
        </span>
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Here are some of our satisfied users who have used this platform.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage alt="" src={image} />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
