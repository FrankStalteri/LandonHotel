package edu.wgu.d387_sample_code.convertor;

import edu.wgu.d387_sample_code.entity.ReservationEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ReservationService {
    public ReservationEntity findLast();
    public List<ReservationEntity> findAll();
}
