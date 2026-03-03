export function isTeacherId(id: string | null | undefined) {
    if(!id) return false
    
    const teachersId = ["user_2x8QwR3VzyN7AnWmyHgnjMeW3b8","user_2y08non2WNf86CbHjg8MRP5vcTt"]

    return teachersId.includes(id)
}
