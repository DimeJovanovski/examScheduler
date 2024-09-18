package mk.ukim.finki.examscheduler.web.repository;

import mk.ukim.finki.examscheduler.web.model.Room;
import mk.ukim.finki.examscheduler.web.model.projections.RoomNameProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    /*
    Projection of room table (only the name/id column)
     */
    List<RoomNameProjection> findAllBy();
    Set<Room> findByNameIn(Set<String> names);
}