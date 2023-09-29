import AlertError from './alertError';

export default function Error({ error }) {
  return Array.isArray(error) ? (
    error.map((e) => <AlertError error={e} />)
  ) : (
    <AlertError error={error} />
  );
}
