/* eslint-disable @typescript-eslint/no-explicit-any */
import BooksDetails from "@/components/books/BooksDetails/BooksDetails";
import Navbar from "@/components/Navbar/Navbar";
import { FC } from "react";

interface IdParams {
    id: string; // or number, based on your use case
}

interface pageProps {
    params: {
        id: IdParams; // id is now an object
    };
}
const BookDetail: FC<pageProps> = async ({ params }) => {

    console.log(typeof (params.id), "params");

    // const router = useRouter();
    // const { id } = router.query;

    return (
        <div >
            <Navbar />
            <BooksDetails id={params.id as any} />
        </div>
    );
}
export default BookDetail