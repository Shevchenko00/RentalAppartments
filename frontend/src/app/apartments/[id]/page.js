export const dynamic = 'force-dynamic';

import { getApartmentById } from "@/api/apartmentsApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ApartmentDetailPage = async ({ params }) => {
    const awaitedParams = await params;
    const { id } = awaitedParams;
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const apartment = await getApartmentById(id, token);
    if (!apartment) {
        redirect('/login');
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>{apartment.title}</h1>
            <img
                src={apartment.photo}
                alt={apartment.title}
                style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
            />
            <p><strong>Цена:</strong> ${apartment.price}</p>
            <p><strong>Описание:</strong> {apartment.description}</p>
            <p><strong>Город:</strong> {apartment.city}</p>
            <p><strong>Улица:</strong> {apartment.street}</p>
            <p><strong>Тип жилья:</strong> {apartment.apartment_type}</p>
            <p><strong>Количество комнат:</strong> {apartment.count_room}</p>
        </div>
    );
}

export default ApartmentDetailPage;
