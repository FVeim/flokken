import { Elysia } from "elysia";

new Elysia()
.get("/greet", () => ({ hello: "world" }))
.listen(4000)
