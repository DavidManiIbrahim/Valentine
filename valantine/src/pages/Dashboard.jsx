import { useParams, useEffect, useState } from "react";
import API from "../api/axios";

// CSS-in-JS styles object
const styles = {
  container: {
    padding: '24px',
    backgroundColor: 'white',
    minHeight: '100vh',
    boxSizing: 'border-box'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1f2937'
  },
  text: {
    fontSize: '16px',
    marginBottom: '12px',
    color: '#374151',
    lineHeight: '1.5'
  },
  label: {
    fontWeight: '600',
    color: '#111827'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    fontSize: '16px',
    color: '#6b7280'
  }
};

export default function Dashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get(`/valentine/dashboard/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div style={styles.loading}>Loading dashboard data...</div>;
  }

  if (!data) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.text}>Failed to load data. Please try again.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.text}>
        <span style={styles.label}>Status:</span> {data.response}
      </p>
      <p style={styles.text}>
        <span style={styles.label}>Responded at:</span> {data.respondedAt || "Pending"}
      </p>
    </div>
  );
}