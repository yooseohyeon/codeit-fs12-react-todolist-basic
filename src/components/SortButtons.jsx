export const SortButtons = ({ sortBy, setSortBy }) => {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="latest">최신순</option>
      <option value="oldest">등록순</option>
    </select>
  );
};
