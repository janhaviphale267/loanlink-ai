import { useState, useEffect, useCallback, useRef } from "react";
import * as adminApi from "../api/adminApi";

export default function useAdminMonitor({ pollIntervalMs = 10000 } = {}) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const fetchList = useCallback(
    async (f = filters) => {
      setLoading(true);
      setError(null);
      try {
        const res = await adminApi.fetchAdminApplications(f);
        setApplications(res || []);
        return res;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchList().catch(() => {});

    if (pollIntervalMs > 0) {
      timerRef.current = setInterval(() => {
        fetchList().catch(() => {});
      }, pollIntervalMs);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollIntervalMs, fetchList]);

  const setFilter = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      fetchList(newFilters).catch(() => {});
    },
    [fetchList]
  );

  const getAuditTrail = useCallback(async (loanId) => {
    try {
      return await adminApi.getAuditTrail(loanId);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const overrideDecision = useCallback(
    async (loanId, payload) => {
      try {
        const res = await adminApi.overrideDecision(loanId, payload);
        fetchList().catch(() => {});
        return res;
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [fetchList]
  );

  const fetchRecommendations = useCallback(async (loanId) => {
    try {
      return await adminApi.fetchRecommendations(loanId);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  return {
    applications,
    loading,
    error,
    filters,
    setFilter,
    refresh: fetchList,
    getAuditTrail,
    overrideDecision,
    fetchRecommendations,
  };
}
