import bcrypt from 'bcryptjs'
import userModel from '../../DB/model/user.model.js'
import categoryModel from '../../DB/model/category.model.js'
import subcategoryModel from '../../DB/model/subcategory.model.js'
import brandModel from '../../DB/model/brand.model.js'
import productModel from '../../DB/model/product.model.js'
import connectDB from '../../DB/connection.js'

/**
 * Seed the database with sample data for demo purposes
 */
export const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...')
        
        // Connect to database
        await connectDB()
        
        // Create demo admin user
        const adminExists = await userModel.findOne({ role: 'Admin' })
        let adminUser
        
        if (!adminExists) {
            const hashedPassword = bcrypt.hashSync('admin123', 10)
            adminUser = await userModel.create({
                userName: 'Demo Admin',
                email: 'admin@demo.com',
                password: hashedPassword,
                role: 'Admin',
                confirmEmail: true,
                active: true
            })
            console.log('✅ Demo admin user created')
        } else {
            adminUser = adminExists
            console.log('ℹ️  Admin user already exists')
        }
        
        // Create demo regular user
        const userExists = await userModel.findOne({ email: 'user@demo.com' })
        let demoUser
        
        if (!userExists) {
            const hashedPassword = bcrypt.hashSync('user123', 10)
            demoUser = await userModel.create({
                userName: 'Demo User',
                email: 'user@demo.com',
                password: hashedPassword,
                role: 'User',
                confirmEmail: true,
                active: true
            })
            console.log('✅ Demo user created')
        } else {
            demoUser = userExists
            console.log('ℹ️  Demo user already exists')
        }
        
        // Create sample categories
        const categories = [
            { name: 'Electronics', createdBy: adminUser._id },
            { name: 'Clothing', createdBy: adminUser._id },
            { name: 'Books', createdBy: adminUser._id }
        ]
        
        const createdCategories = []
        for (const categoryData of categories) {
            const exists = await categoryModel.findOne({ name: categoryData.name })
            if (!exists) {
                const category = await categoryModel.create(categoryData)
                createdCategories.push(category)
                console.log(`✅ Category "${categoryData.name}" created`)
            } else {
                createdCategories.push(exists)
                console.log(`ℹ️  Category "${categoryData.name}" already exists`)
            }
        }
        
        // Create sample subcategories
        const subcategories = [
            { name: 'Smartphones', categoryId: createdCategories[0]._id, createdBy: adminUser._id },
            { name: 'Laptops', categoryId: createdCategories[0]._id, createdBy: adminUser._id },
            { name: 'T-Shirts', categoryId: createdCategories[1]._id, createdBy: adminUser._id },
            { name: 'Fiction', categoryId: createdCategories[2]._id, createdBy: adminUser._id }
        ]
        
        const createdSubcategories = []
        for (const subcategoryData of subcategories) {
            const exists = await subcategoryModel.findOne({ name: subcategoryData.name })
            if (!exists) {
                const subcategory = await subcategoryModel.create(subcategoryData)
                createdSubcategories.push(subcategory)
                console.log(`✅ Subcategory "${subcategoryData.name}" created`)
            } else {
                createdSubcategories.push(exists)
                console.log(`ℹ️  Subcategory "${subcategoryData.name}" already exists`)
            }
        }
        
        // Create sample brands
        const brands = [
            { name: 'Apple', createdBy: adminUser._id },
            { name: 'Samsung', createdBy: adminUser._id },
            { name: 'Nike', createdBy: adminUser._id }
        ]
        
        const createdBrands = []
        for (const brandData of brands) {
            const exists = await brandModel.findOne({ name: brandData.name })
            if (!exists) {
                const brand = await brandModel.create(brandData)
                createdBrands.push(brand)
                console.log(`✅ Brand "${brandData.name}" created`)
            } else {
                createdBrands.push(exists)
                console.log(`ℹ️  Brand "${brandData.name}" already exists`)
            }
        }
        
        // Create sample products
        const products = [
            {
                name: 'iPhone 14',
                description: 'Latest iPhone with amazing features',
                price: 999,
                stock: 50,
                finalPrice: 999,
                categoryId: createdCategories[0]._id,
                subcategoryId: createdSubcategories[0]._id,
                brandId: createdBrands[0]._id,
                createdBy: adminUser._id,
                colors: ['Black', 'White', 'Blue'],
                size: ['m']
            },
            {
                name: 'MacBook Pro',
                description: 'Powerful laptop for professionals',
                price: 1999,
                stock: 25,
                finalPrice: 1999,
                categoryId: createdCategories[0]._id,
                subcategoryId: createdSubcategories[1]._id,
                brandId: createdBrands[0]._id,
                createdBy: adminUser._id,
                colors: ['Silver', 'Space Gray'],
                size: ['l']
            },
            {
                name: 'Nike Air Max',
                description: 'Comfortable running shoes',
                price: 150,
                stock: 100,
                finalPrice: 150,
                categoryId: createdCategories[1]._id,
                subcategoryId: createdSubcategories[2]._id,
                brandId: createdBrands[2]._id,
                createdBy: adminUser._id,
                colors: ['Black', 'White', 'Red'],
                size: ['s', 'm', 'l', 'xl']
            }
        ]
        
        for (const productData of products) {
            const exists = await productModel.findOne({ name: productData.name })
            if (!exists) {
                await productModel.create(productData)
                console.log(`✅ Product "${productData.name}" created`)
            } else {
                console.log(`ℹ️  Product "${productData.name}" already exists`)
            }
        }
        
        console.log('🎉 Database seeding completed successfully!')
        console.log('\n📊 Demo Accounts:')
        console.log('👨‍💼 Admin: admin@demo.com / admin123')
        console.log('👤 User: user@demo.com / user123')
        
    } catch (error) {
        console.error('❌ Error seeding database:', error)
    }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase().then(() => process.exit(0))
}
