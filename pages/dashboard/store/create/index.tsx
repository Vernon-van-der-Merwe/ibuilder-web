import { Button, Container, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

import * as StoreService from "@service/storeService"
import { CreateStoreInput } from "@service/storeService";
import { config } from "@config/forms/createStore";

export function CreateStore({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false) 

  const form = useForm(config);

  const handleSubmit = async () => {
    const input: CreateStoreInput = {
      name: form.values.name, 
      description: form.values.description
    }
    
    await StoreService.create(
     input,
     router,
     setLoading)
   };

  return (
    <>
      <Container>
        <h1>My Store</h1>
        <form onSubmit={form.onSubmit(async () => { handleSubmit() })}>
          <div style={{ maxWidth: 320, margin: "auto" }}>
            <TextInput
              label="Store Name"
              placeholder="React Cafe'"
              {...form.getInputProps("name")}
            />
            <Textarea
              mt="md"
              label="Description"
              placeholder="A development inspired, cozy spot for all to enjoy our delicatly crafted coffee."
              {...form.getInputProps("description")}
            />

            <Group position="center" mt="xl">
              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </Group>
          </div>
        </form>
      </Container>
    </>
  );
}

export default CreateStore;
