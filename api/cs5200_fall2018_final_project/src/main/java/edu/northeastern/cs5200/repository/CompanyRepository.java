package edu.northeastern.cs5200.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.northeastern.cs5200.model.*;

public interface CompanyRepository extends JpaRepository<Company, Integer>  {
	@Query("select company from Company company left join fetch company.careerEvents")
	public List<Company> findAllCompaniesDetailed();
	
	@Query("select company from Company company where locate(lower(?1), lower(company.name)) > 0")
	public List<Company> findCompaniesByName(String name);
	
	@Query("select company from Company company left join fetch company.careerEvents careerEvents where company.id=?1")
	public Company findWithCareerEvents(int id);
}
