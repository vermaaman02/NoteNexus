import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { notesService } from '../services/api';
import { Search, Download, Eye } from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const SearchSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  &:hover {
    background: #5a6fd8;
  }
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const NoteCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const NoteTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const NoteDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const NoteMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const MetaTag = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #555;
`;

const NoteActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &.view {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a6fd8;
    }
  }

  &.download {
    background: #10b981;
    color: white;
    
    &:hover {
      background: #059669;
    }
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #888;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  &.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    course: '',
    semester: '',
    subject: '',
    college: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });

  const fetchNotes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
        search: searchTerm,
        ...filters
      };

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '') {
          delete params[key];
        }
      });

      const response = await notesService.getAllNotes(params);
      setNotes(response.data.notes);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearch = () => {
    fetchNotes(1);
  };

  const handleDownload = async (noteId, fileName) => {
    try {
      const response = await notesService.downloadNote(noteId);
      // Create download link
      const link = document.createElement('a');
      link.href = `http://localhost:5000${response.data.downloadUrl}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started!');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const handlePageChange = (page) => {
    fetchNotes(page);
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <h1>Welcome to NoteNexus</h1>
          <p>Your one-stop platform for sharing and accessing college notes</p>
          <p>Connect with fellow students and excel in your studies</p>
        </HeroContent>
      </HeroSection>

      <SearchSection>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search notes by title, subject, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <FilterSelect
            value={filters.course}
            onChange={(e) => setFilters({...filters, course: e.target.value})}
          >
            <option value="">All Courses</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Medicine">Medicine</option>
            <option value="Arts">Arts</option>
          </FilterSelect>
          <FilterSelect
            value={filters.semester}
            onChange={(e) => setFilters({...filters, semester: e.target.value})}
          >
            <option value="">All Semesters</option>
            {[1,2,3,4,5,6,7,8].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </FilterSelect>
          <SearchButton onClick={handleSearch}>
            <Search size={18} />
            Search
          </SearchButton>
        </SearchBar>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Loading notes...
          </div>
        ) : (
          <>
            <NotesGrid>
              {notes.map((note) => (
                <NoteCard key={note._id}>
                  <NoteTitle>{note.title}</NoteTitle>
                  <NoteDescription>
                    {note.description.length > 150 
                      ? `${note.description.substring(0, 150)}...` 
                      : note.description
                    }
                  </NoteDescription>
                  <NoteMeta>
                    <MetaTag>{note.subject}</MetaTag>
                    <MetaTag>{note.course}</MetaTag>
                    <MetaTag>Sem {note.semester}</MetaTag>
                    <MetaTag>{note.college}</MetaTag>
                  </NoteMeta>
                  <Stats>
                    <span>{note.downloads} downloads</span>
                    <span>{note.likes?.length || 0} likes</span>
                    <span>By {note.uploadedBy?.name}</span>
                  </Stats>
                  <NoteActions>
                    <Link to={`/note/${note._id}`}>
                      <ActionButton className="view">
                        <Eye size={16} />
                        View Details
                      </ActionButton>
                    </Link>
                    <ActionButton 
                      className="download"
                      onClick={() => handleDownload(note._id, note.fileName)}
                    >
                      <Download size={16} />
                      Download
                    </ActionButton>
                  </NoteActions>
                </NoteCard>
              ))}
            </NotesGrid>

            {notes.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                No notes found. Try adjusting your search criteria.
              </div>
            )}

            {pagination.pages > 1 && (
              <Pagination>
                <PageButton 
                  onClick={() => handlePageChange(pagination.current - 1)}
                  disabled={!pagination.hasPrev}
                >
                  Previous
                </PageButton>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                  <PageButton
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={page === pagination.current ? 'active' : ''}
                  >
                    {page}
                  </PageButton>
                ))}
                
                <PageButton 
                  onClick={() => handlePageChange(pagination.current + 1)}
                  disabled={!pagination.hasNext}
                >
                  Next
                </PageButton>
              </Pagination>
            )}
          </>
        )}
      </SearchSection>
    </HomeContainer>
  );
};

export default Home;
