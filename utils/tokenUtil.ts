import jwt from 'jsonwebtoken'

export const encodeToken = (input: { [name: string]: any }) => {
  const secret = process.env.SECRET_TOKEN || "APP_SECRET_TOKEN_1975917509175091702570";
  return jwt.sign(input, secret, {
    algorithm: "HS256"
  });
}

export const decodeToken = (token: string) => {
  const secret = process.env.SECRET_TOKEN || "APP_SECRET_TOKEN_1975917509175091702570";
  return jwt.verify(token, secret, {
    algorithms: ["HS256"]
  }) as { [name: string]: any }
}

