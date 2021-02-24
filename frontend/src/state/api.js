const api = async (data, url) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: user?.token || "",
        },
        method: "POST",
        body: JSON.stringify(data),
    };
    try {
        const response = await fetch(`${url}`, requestOptions);
        if (response.status === 200) {
            return await response.json();
        }
        throw new Error("Bad Request");
    } catch (e) { }
};

export const login = async (data) => {
    const user = await api(data, "/api/login");
    if (user?.token) {
        localStorage.setItem("user", JSON.stringify(user));
    }
    return user;
};

export const report = async (data) => {
    return await api(data, "/api/report");
};
