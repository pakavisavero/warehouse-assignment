import { useEffect, useState } from "react";
import { fetchPackages } from "@/api/packages";
export const usePackages = ({ selectedStatus, currentPage, itemsPerPage }) => {
    const [packages, setPackages] = useState([]);
    const [aggregates, setAggregates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const result = await fetchPackages({ selectedStatus, currentPage, itemsPerPage });
                if (!isMounted)
                    return;
                setPackages(result.packages);
                setAggregates(result.aggregates);
                setTotalPages(result.totalPages);
                setLoading(false);
            }
            catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        load();
        const interval = setInterval(load, 5000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [selectedStatus, currentPage, itemsPerPage]);
    return { packages, aggregates, loading, totalPages };
};
