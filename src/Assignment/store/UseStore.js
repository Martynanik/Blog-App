import create from 'zustand';

const useStore = create((set) => ({
    currentPage: 1, // Initial page number
    setCurrentPage: (page) => set({ currentPage: page }),
    paginationStart: 0, // Initial page number
    setPaginationStart: (num) => set({paginationStart: num }),
    paginationEnd: 10, // Initial page number
    setPaginationEnd: (numEnd) => set({paginationEnd: numEnd }),
    activePage: 1, // Initial page number
    setActivePage: (page) => set({ activePage: page }),
}));

export default useStore;