# Bonus challenge

**Question 1 :**
 How can you improve the feature to make it more resilient against abuse/exploitation?

Answer:
- Rate Limiting: I add rate limiting so that each user can only like an article a limited number of times in a short period. 

- Authentication : Requiring users to sign in before they can like articles would also help prevent abuse, and I could limit likes to one per session or per IP address.

**Question 2 :** How can you improve the feature to make it scale to millions of users and perform without issues?

Answer:
- Caching: I would use a cache, like Redis, to store like counts temporarily. Redis can serve like counts faster than the database, which would help a lot if the like counts are requested frequently.
- Batch Writing: Instead of updating the database every time a user clicks like, I’d consider batching the likes and saving them to the database every few seconds. This would reduce the number of database writes.

**Question 3 :** How will you scale to a million concurrent users clicking the button at the same time

Answer:
- Load Balancing: Adding a load balancer would help distribute requests evenly across servers if the app has many users at the same time.

**Question 4 :**
 How will you scale to a million concurrent users requesting the article's like count at the same time

Answer:
- Caching with Redis: I’d rely heavily on Redis or another caching layer to handle the like count. This way, frequent requests wouldn’t hit the database directly.
- CDN for Static Data: If the like counts are static for a short period, I’d cache them in a CDN. This would let users access content quickly from locations closer to them, reducing load on the server.