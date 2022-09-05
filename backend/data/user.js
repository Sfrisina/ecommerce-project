import bcrypt from 'bcryptjs'

const users =[
    {
        name: 'Admin', 
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }, 
    {
        name: 'Sal', 
        email: 'sal@example.com',
        password: bcrypt.hashSync('123456', 10),
    }, 
    {
        name: 'Rose', 
        email: 'rose@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users 