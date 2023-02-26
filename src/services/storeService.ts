import {
    showError,
    showSuccess,
} from "./notificationService";

import { NextRouter, useRouter } from "next/router";
import { Store } from "../../models/store";

export interface CreateStoreInput {
    name: string
    description: string
}

export const create = async (input: CreateStoreInput, router: NextRouter, setLoading) => {
    setLoading(true)

    const response = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify({ input }),
    })
    if (response.status == 200) {
        showSuccess("Store Added", "Whoopty do!");
        router.push("/store");
    } else {
        showError("Oops!", "Something went wrong 👀");
    }

    setLoading(false)
};

export const getAll = async (setLoading) => {
    setLoading(true)

    const response = await fetch("/api/store", {
        method: "GET",
    })
    
    if (response.status == 200) {
        setLoading(false)
        return response.body
    } else {
        showError("Oops!", "Something went wrong 👀");
        setLoading(false)
        return []
    }
};
