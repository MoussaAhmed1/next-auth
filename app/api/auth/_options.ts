import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // console.log('credentials',credentials?.username)
        try {
          const res = await fetch('http://31.220.73.176:3000/v1/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password
            }),
            headers: { 'Content-Type': 'application/json' }
          })
          const user = await res.json()
          console.log(user)
          if(res.ok){
            return user
          }
          else{
            return null;
          }
        } catch (error) {
          console.log('error')
          return null
        }
        // If no error and we have user data, return it
        // Return null if user data could not be retrieved
      }
    })
  ]
}
