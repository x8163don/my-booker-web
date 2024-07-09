import {useParams} from "react-router-dom";
import Error from "../../components/ui/Error";
import {useQuery} from "@tanstack/react-query";
import {getBookingDetail} from "../../api/booking";
import Loading from "../../components/ui/Error";

export default function Booking() {
    const params = useParams()

    const {
        data: bookingDetail,
        isPending: isBookingDetailPending,
        isError: isBookingDetailError,
    } = useQuery({
        queryFn: (signal) => getBookingDetail({slug: params.slug, key: params.key, signal: signal}),
    })

    if (isBookingDetailPending) {
        return <Loading/>
    }

    if (isBookingDetailError) {
        return <Error/>
    }

    return <main>
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Booking</h2>
                <p>Coming soon...</p>
            </div>
        </div>
    </main>
}
