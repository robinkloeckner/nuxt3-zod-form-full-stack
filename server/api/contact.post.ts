import { formSchema } from "~/utils/Validators";

// Define POST contact endpoint.
export default defineEventHandler(async (event) => {
    // Check http header.
    // ...

    // Read the HTTP body and validate it according to the zod form schema.
    const result = await readValidatedBody(event, body => formSchema.safeParse(body));

    // Debug: Log validation results server-side.
    // console.log("Results server: ", result);

    // Handle validation error.
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: " Validation failed",
        });
    }

    // Process successfully validated data here.
    //...

    // Return status code 200.
    return { statusCode: 200, message: "Data processed successfully" };
});
