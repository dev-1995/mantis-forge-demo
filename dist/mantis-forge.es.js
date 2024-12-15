import p from "jsonwebtoken";
import l from "dotenv";
import i from "winston";
import u from "pg";
import { Router as g } from "express";
l.config();
const n = {
  port: process.env.PORT || 3e3,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "myapp"
  }
}, x = (s) => p.sign(s, n.jwtSecret, { expiresIn: "1h" }), M = (s, e, r) => {
  const t = s.headers.authorization?.split(" ")[1];
  if (!t)
    return e.status(401).json({ message: "No token provided" });
  try {
    const o = p.verify(t, n.jwtSecret);
    s.user = o, r();
  } catch {
    return e.status(401).json({ message: "Invalid token" });
  }
}, a = i.createLogger({
  level: "info",
  format: i.format.json(),
  transports: [
    new i.transports.Console(),
    new i.transports.File({ filename: "error.log", level: "error" }),
    new i.transports.File({ filename: "combined.log" })
  ]
}), c = new u.Pool(n.database), h = (s, e, r, t) => {
  a.error(`${s.name}: ${s.message}`), r.status(500).json({ error: "Internal Server Error" });
};
class f {
  router;
  prefixes;
  constructor() {
    this.router = g(), this.prefixes = /* @__PURE__ */ new Set();
  }
  registerPlugin(e) {
    if (this.prefixes.has(e.prefix))
      throw new Error(`Plugin prefix "${e.prefix}" is already in use`);
    this.prefixes.add(e.prefix), this.router.use(e.prefix, (r, t, o) => {
      e.register(r.app, r.app.locals.config, r.app.locals.env), o();
    });
  }
  getRouter() {
    return this.router;
  }
}
class d {
  plugins;
  router;
  constructor() {
    this.plugins = [], this.router = new f();
  }
  registerPlugin(e) {
    this.plugins.push(e), this.router.registerPlugin(e);
  }
  initializePlugins(e, r, t) {
    this.plugins.forEach((o) => {
      o.register(e, r, t);
    }), e.use(this.router.getRouter());
  }
  getRouter() {
    return this.router.getRouter();
  }
}
class S {
  constructor(e, r, t) {
    this.app = e, this.mantisRouter = r, this.pluginManager = new d(), this.app.locals.config = { ...n, ...t.config }, this.app.locals.env = {
      db: c,
      logger: a
    }, this.setupMiddleware();
  }
  pluginManager;
  setupMiddleware() {
    this.app.use("/mantis", this.mantisRouter), this.app.use(h);
  }
  registerPlugin(e) {
    this.pluginManager.registerPlugin(e);
  }
  initialize() {
    this.pluginManager.initializePlugins(this.mantisRouter, this.app.locals.config, this.app.locals.env), a.info("Mantis framework initialized");
  }
}
export {
  S as default,
  x as generateToken,
  M as verifyToken
};
//# sourceMappingURL=mantis-forge.es.js.map
