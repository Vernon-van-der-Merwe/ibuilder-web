import { Button, Container, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

import * as StoreService from "@service/storeService"
import { config } from "@config/forms/createStore";
import { StoreTable } from "../../../src/components/tables/storeTable";

export function Store({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const data = StoreService.
        return (
            <>
                <Container>
                    <h1>Stores</h1>
                    <button>Create New</button>
                    <StoreTable data={[]}/>
                </Container>
            </>
        );
}

export default Store;