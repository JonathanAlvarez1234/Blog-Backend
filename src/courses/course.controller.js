import Course from "./course.model.js";

const createCoursesD = async (name, description, status) => {
    try {
        if(name === "Taller III" || name === "Tecnologia III" || name === "Practica Supervisada"){
            const existCourse = await Course.findOne({ name: "Taller III" || "Tecnologia III" });
            if(existCourse){
                console.log(`The name course ${name} already exist. New one cannot be created.`);
                return null;
            };
        };
        const newCourse = new Course({
            name,
            description,
            status
        });

        await newCourse.save();
        console.log("Course created succesfully: ", newCourse);
        return newCourse;

    } catch (error) {
        console.error("Error Course Created", error);
        return null;
    }
}

createCoursesD("Taller III", "Este apartado donde se hacen publicaci...", true);
createCoursesD("Tecnologia III", "Este apartado donde se hacen publicaci...", true);
createCoursesD("Practica Supervisada", "Este apartado donde se hacen publicaci...", true);

export const saveCourse = async (req, res) => {
    try {
        const data = req.body;
        const course = new Course({
            ...data
        });
        await course.save();
        res.status(200).json({
            success: true,
            msg: 'Category added Successfully',
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error saving category',
            error
        });
    }
};

export const getCourses = async (req, res) => {
    const {limit = 10, since = 0} = req.query;
    const query = {status: true};
    try {
        const categories = await Category.find(query)
            .skip(Number(since))
            .limit(Number(limit))

        const total = await Category.countDocuments(query)
        res.status(200).json({
            success: true,
            total,
            categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al getting categories',
            error
        })
    }
}